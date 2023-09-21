import mongoose from "mongoose"

/*** COUNTER ***/
interface IV2BucketCounter {
	_id: mongoose.Types.ObjectId
	count: number
	lastFile: string
}
const v2BucketCounterSchema =
	new mongoose.Schema<IV2BucketCounter>({
		count: {
			type: Number,
			default: 0,
		},
		lastFile: {
			type: String,
			default: "",
		},
	})

export { type IV2BucketCounter, v2BucketCounterSchema }
