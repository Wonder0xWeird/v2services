import mongoose from "mongoose"

import {
	IV2BucketCounter,
	v2BucketCounterSchema,
} from "./v2bucketcounter"
import { IV2Session, v2sessionSchema } from "./v2session"

if (mongoose.models) {
	delete mongoose.models.V2BucketCounter
	delete mongoose.models.V2Session
}

const V2BucketCounter = mongoose.model<IV2BucketCounter>(
	"V2BucketCounter",
	v2BucketCounterSchema
)

const V2Session = mongoose.model<IV2Session>(
	"V2Session",
	v2sessionSchema
)

export { V2BucketCounter, V2Session }
