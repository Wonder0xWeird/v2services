import dbConnection from "@/lib/mongo/connectDB"
import { V2Session } from "@/lib/mongo/models"
import { verifyApiKey } from "@/lib/utils"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		verifyApiKey(req, "tribally")

		await dbConnection

		let sessions
		let battleId = parseInt(req.query.battleId as string)
		let playerId = req.query.playerId as string
		let numSessions =
			parseInt(req.query.numSessions as string) || 250
		let modeQuery = {}
		if (req.query.mode) {
			modeQuery =
				req.query.mode === "pvp"
					? { pvp_type: "arena" }
					: { pvp_type: { $ne: "arena" } }
		}

		if (!playerId && isNaN(battleId)) {
			return res.status(400).json({
				statusCode: 400,
				message:
					"Error: Missing required query params - Please include playerId ('0x...') or battleId (int).",
				data: null,
			})
		}

		if (!isNaN(battleId))
			sessions = await V2Session.find({
				battleId: { $gte: battleId },
				...modeQuery,
			})
				.limit(numSessions)
				.lean()
		else {
			sessions = await V2Session.find({
				$or: [
					{ first_client_id: playerId, ...modeQuery },
					{ second_client_id: playerId, ...modeQuery },
					{ client_id: playerId, ...modeQuery },
				],
			})
				.limit(numSessions)
				.sort({ battleId: -1 })
				.lean()
		}

		return res.status(200).json({
			statusCode: 200,
			message: !isNaN(battleId)
				? `${sessions.length} ${
						!req.query.mode
							? ""
							: req.query.mode === "pvp"
							? "pvp "
							: "pve "
				  }Game Sessions (from battleId: ${battleId}) fetched successfully.`
				: `Most recent ${sessions.length} ${
						!req.query.mode
							? ""
							: req.query.mode === "pvp"
							? "pvp "
							: "pve "
				  }Game Sessions for playerId ${playerId} fetched successfully.`,
			data: sessions,
		})
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
