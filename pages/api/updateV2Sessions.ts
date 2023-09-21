import fs from "fs"
import dbConnection from "@/lib/mongo/connectDB"
import {
	V2BucketCounter,
	V2Session,
} from "@/lib/mongo/models"
import { NextApiRequest, NextApiResponse } from "next"
import { Storage } from "@google-cloud/storage"

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		await dbConnection

		let counter = await V2BucketCounter.findOne({})
		if (!counter) {
			const count = await V2Session.countDocuments()
			counter = new V2BucketCounter({
				count: count,
				lastFile:
					"classic/topic=game-server.battle-history.pve/classic_2023-09-21T04:58:34_d90f2e.json",
			})
			await counter.save()
		}
		let battleId = counter.count
		let lastFile = counter.lastFile

		console.log("Fetching files from:", lastFile)

		// Lists files in the bucket
		const storage = new Storage()
		const bucketName = "battle-history-public"
		const [initialFiles] = await storage
			.bucket(bucketName)
			.getFiles()

		// Sort files by entry date + id
		console.log("Sorting files...")
		const files = initialFiles
			.map((file: any) => file.name)
			.sort((a: string, b: string) => {
				const A = a.split("_")[1] + a.split("_")[2]
				const B = b.split("_")[1] + b.split("_")[2]
				return A.localeCompare(B)
			})

		let lastFileFound = false
		let newFiles: string[] = []
		files.forEach((fileName: string) => {
			if (lastFileFound) {
				newFiles.push(fileName)
			} else if (fileName === lastFile) {
				lastFileFound = true
			}
		})
		console.log("New files:", newFiles.length)
		if (!newFiles.length) return
		lastFile = newFiles[newFiles.length - 1]

		for (let i = 0; i < newFiles.length; i++) {
			console.log("File:", i + 1, "of", newFiles.length)
			const fileName = newFiles[i]
			const options = {
				destination: "./temp.json",
			}

			const storage = new Storage()
			const bucketName = "battle-history-public"
			await storage
				.bucket(bucketName)
				.file(fileName)
				.download(options)

			const file = fs.readFileSync("./temp.json", "utf8")
			const games = file
				.split("\n")
				.filter((text) => text != "")
				.map((sessionText) => {
					const parsed = JSON.parse(sessionText)
					const v2session = new V2Session({
						battleId: battleId++,
						...parsed,
					})
					return v2session
				})
			console.log("Inserting", games.length, "games...")
			await V2Session.insertMany(games)
		}
		console.log("Updating counter...")
		await V2BucketCounter.updateOne(
			{},
			{ count: battleId, lastFile: lastFile }
		)
	} catch (err: any) {
		console.log("err:", err)
		res.status(err.statusCode || 500).json({
			statusCode: err.statusCode || 500,
			message:
				"Error fetching game sessions: " + err.message,
			data: null,
		})
	}
}

export default handler
