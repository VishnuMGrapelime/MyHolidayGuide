import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  orderBy,
  limit,
  startAfter,
  endBefore,
  startAt,
  limitToLast,
  getCountFromServer
} from 'firebase/firestore';

import { db } from '../firebase';

// add data to a collection
export async function addData(collectionName, data) {
  let result = null;
  let error = null;

  try {
    // Define the collection and document data
    const myCollection = collection(db, collectionName);

    // Add the document to the collection
    const result = await addDoc(myCollection, data);
    console.log("data after insert");
    console.log(result);
  } catch (e) {
    error = e;
    console.log(e);
  }

  return { result, error };
}

// get all data from a collection
export async function getData(collectionName) {
  let result = null;
  let error = null;

  try {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    result = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // console.log(result);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function getSingleData(collectionName, id) {
  let result = null;
  let error = null;

  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    result = docSnap.data();
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function getDataByFieldValue(
  collectionName,
  fieldName,
  fieldValue,
) {
  let result = null;
  let error = null;

  try {
    // console.log(collectionName);
    var collectionRef = collection(db, collectionName);

    const qData = query(collectionRef, where(fieldName, '==', fieldValue));

    const querySnapshot = await getDocs(qData);
    querySnapshot.forEach((doc) => {
      result = doc.data();
    });
  } catch (e) {
    error = e;
    console.log(e);
  }

  return result;
}

// export async function getAllDataByFieldValue(
//   collectionName,
//   fieldName,
//   fieldValue,
// ) {
//   let result = [];
//   let error = null;

//   try {
//     // console.log(collectionName);
//     var collectionRef = collection(db, collectionName);

//     const qData = query(collectionRef, where(fieldName, '==', fieldValue), orderBy('createdAt', "desc"), limit(5));

//     const querySnapshot = await getDocs(qData);


//     querySnapshot.forEach((doc) => {
//       result.push({ ...doc.data(), id: doc.id });
//     });

//     const countData = query(collectionRef, where(fieldName, '==', fieldValue));
//     const snapshot = await getCountFromServer(countData);

//     const totalSize = snapshot.data().count;


//   } catch (e) {
//     error = e;
//     console.log(e);
//   }

//   return result;
// }

export async function getAllDataByFieldValue(
  collectionName,
  fieldName,
  fieldValue,
) {
  let result = [];
  let error = null;

  try {
    // console.log(collectionName);
    var collectionRef = collection(db, collectionName);

    const qData = query(collectionRef, where(fieldName, '==', fieldValue));

    const querySnapshot = await getDocs(qData);
    //result = querySnapshot.data();
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      result.push({ ...doc.data(), id: doc.id });
    });
  } catch (e) {
    error = e;
    console.log(e);
  }

  return result;
}

export async function getPaginatedDataByFieldValue(
  collectionName,
  fieldName,
  fieldValue,
  startAfterLimit,
  Datalimit,
  action
) {
  let result = [];
  let error = null;

  try {
    // console.log(collectionName);
    var collectionRef = collection(db, collectionName);
    console.log("Action is" + action);
    let qData = "";
    if (action == "load") {
      qData = query(collectionRef, where(fieldName, '==', fieldValue), orderBy('createdAt', "desc"), limit(Datalimit));
    } else if (action == "next") {
      console.log("startAfter is " + startAfterLimit)
      qData = query(collectionRef, where(fieldName, '==', fieldValue), orderBy('createdAt', "desc"), startAfter(startAfterLimit), limit(Datalimit));

    } else if (action == "previous") {
      console.log("endBefore is " + startAfterLimit)
      qData = query(collectionRef, where(fieldName, '==', fieldValue), orderBy('createdAt', "desc"), endBefore(startAfterLimit), limitToLast(Datalimit));

    }


    const querySnapshot = await getDocs(qData);


    querySnapshot.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });

    const countData = query(collectionRef, where(fieldName, '==', fieldValue));
    const snapshot = await getCountFromServer(countData);

    const totalSize = snapshot.data().count;


  } catch (e) {
    error = e;
    console.log(e);
  }

  return result;
}

export async function updateData(collectionName, id, data) {
  let result = null;
  let error = null;

  try {
    const docRef = doc(db, collectionName, id);

    const docSnap = await updateDoc(docRef, data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function deleteData(collectionName, id) {
  let result = null;
  let error = null;

  try {
    const docRef = doc(db, collectionName, id);

    const docSnap = await deleteDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
