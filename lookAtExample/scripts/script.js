const S = require("Scene");
const R = require("Reactive");
const D = require("Diagnostics");
const Time = require("Time");

const find = e => S.root.find(e);

const plane = find("plane0");
const followNull = find("followNull");
const targetNull = find("targetNull");

// Random animation
targetNull.transform.x = R.sin(Time.ms.mul(R.val(0.001))).mul(0.5);
targetNull.transform.y = R.cos(Time.ms.mul(R.val(0.0007))).mul(0.5);
targetNull.transform.z = R.sin(Time.ms.mul(R.val(0.0005))).mul(0.5);

// Lookat
const lookAtPt = R.point(targetNull.worldTransform.x, targetNull.worldTransform.y, targetNull.worldTransform.z);
plane.transform = followNull.worldTransform.lookAt(lookAtPt);
