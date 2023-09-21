import { V2BucketCounter } from "./mongo/models"
import { UnauthorizedException } from "./exceptions"
import { NextApiRequest } from "next"

export const incrementV2BucketCounter = async (
	lastFile: string
) => {
	let counter = await V2BucketCounter.findOne({})

	if (!counter) {
		const count = await V2BucketCounter.countDocuments()
		counter = new V2BucketCounter({
			count: count,
			lastFile: lastFile,
		})
		await counter.save()
	} else {
		counter.count += 1
		counter.lastFile = lastFile
		await counter.save()
	}
	return counter.toObject()
}

export function verifyApiKey(
	req: NextApiRequest,
	type: string
) {
	const apiKey = req.headers["x-api-key"]

	if (!apiKey) {
		throw new UnauthorizedException(
			"Unauthorized - API key is required"
		)
	}

	if (
		apiKey !== process.env[type.toUpperCase() + "_API_KEY"]
	) {
		throw new UnauthorizedException(
			"Unauthorized - Invalid API key"
		)
	}
}
