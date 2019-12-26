const S = require("Scene");
const R = require("Reactive");
const Time = require("Time");

const find = e => S.root.find(e);

const plane = find("plane0");
const followNull = find("followNull");
const targetNull = find("targetNull");

// Random animation
const scl = R.val(0.1);
targetNull.transform.x = R.sin(Time.ms.mul(R.val(0.001))).mul(scl);
targetNull.transform.y = R.cos(Time.ms.mul(R.val(0.0007))).mul(scl);
targetNull.transform.z = R.sin(Time.ms.mul(R.val(0.0005))).mul(scl);

// Lookat
const lookAtPt = R.point(targetNull.transform.x, targetNull.transform.y, targetNull.transform.z);
const lookAtTransform = followNull.transform.lookAt(lookAtPt);

plane.transform.rotationX = lookAtTransform.rotationX;
plane.transform.rotationY = lookAtTransform.rotationY;
plane.transform.rotationZ = lookAtTransform.rotationZ;
