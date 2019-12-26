const S = require("Scene");
const R = require("Reactive");
const Time = require("Time");

// Finds an element in the scene
// - Parameters:
//      e: The object to find
const find = e => S.root.find(e);

// Gets the position of an object as an R.point
// - Parameters:
//      e: The object to get the transform from
const getPosition = e => R.point(e.transform.x, e.transform.y, e.transform.z);

// Sets the rotation based on a transform
// - Parameters:
//      e: The object to rotate
//      p: The transform to use
const setRotation = (e, p) => {
  e.transform.rotationX = p.rotationX;
  e.transform.rotationY = p.rotationY;
  e.transform.rotationZ = p.rotationZ;
};

// Look at utility function.
// Because of reactive stupidness, we can't actually apply the lookat directly to the looker itself
// We get around this by nesting the looker object inside a null with no values applied to it's transform
//
// - Parameters:
//      _target: The object in the scene you want to face
//      _lookerParent: The parent object of the object you want to rotate. Should have no transform applied to it
//      _looker: The object that you want to rotate towards the target
const lookAt = (_target, _lookerParent, _looker) => {
  const ptToLookAt = getPosition(_target);
  const lookAtTransform = _lookerParent.transform.lookAt(ptToLookAt);
  setRotation(_looker, lookAtTransform);
};

const plane = find("plane0");
const followNull = find("followNull");
const targetNull = find("targetNull");

// Random animation
const scl = R.val(0.1);
targetNull.transform.x = R.sin(Time.ms.mul(R.val(0.001))).mul(scl);
targetNull.transform.y = R.cos(Time.ms.mul(R.val(0.0007))).mul(scl);
targetNull.transform.z = R.sin(Time.ms.mul(R.val(0.0005))).mul(scl);

// Do the look at
lookAt(targetNull, followNull, plane);

// Here's a simpler implementation without the helper functions
// const lookAtPt = R.point(targetNull.transform.x, targetNull.transform.y, targetNull.transform.z);
// const lookAtTransform = followNull.transform.lookAt(lookAtPt);

// plane.transform.rotationX = lookAtTransform.rotationX;
// plane.transform.rotationY = lookAtTransform.rotationY;
// plane.transform.rotationZ = lookAtTransform.rotationZ;
