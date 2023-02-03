import PocketBase from "pocketbase";
import { useEffect, useState } from "react";


// PB_ONLINE   PB_LOCAL
  const client = new PocketBase("https://buylink.pockethost.io");


function  usePocketBase() {
  // const [pb, setPb] = useState();
  // const [pb, setPb] = useState();
  // console.log("PB_ONLINE",process.env.PB_ONLINE);

  // const isLogged = pb.authStore.isValid?true:false;
  const initPocketBase = async (req, res) => {
    // load the store data from the request cookie string
    client.authStore.loadFromCookie(req?.headers?.cookie || "");

    // send back the default 'pb_auth' cookie to the client with the latest store state
    client.authStore.onChange(() => {
      res?.setHeader("set-cookie", client.authStore.exportToCookie());
    });

    try {
      // Admin
      const authData = await client.admins.authWithPassword(
        "racielfg01@gmail.com",
        "RAciel.123*"
      );

      // // users
      // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
      // const authData = await pb
      //   .collection("users")
      //   .authWithPassword("userTest", "userTest");

      // // after the above you can also access the auth data from the authStore
      // console.log(client.authStore.isValid);
      // console.log(client.authStore.token);
      // console.log(client.authStore.model.id);

      // // "logout" the last authenticated model
      // pb.authStore.clear();
      // client.authStore.isValid && (await client.collection("users").authRefresh());
    } catch (_) {
      // clear the auth store on failed refresh
      client.authStore.clear();
    }

 return client;
  };

  const createUser = async (data) => {
    const record = await pb.collection("users").create(data);

    // (optional) send an email verification request
    // await pb.collection("users").requestVerification("test@example.com");

    return record;
  };

  const updateUser = async (id, data) => {
    const record = await pb.collection("users").update(id, data);

    return record;
  };

  const loginUser = async (email, pass) => {
    // const pb = await initPocketBase();

    const resultAuth = await pb
      .collection("users")
      .authWithPassword(email, pass);

    // after the above you can also access the auth data from the authStore
    // console.log(pb.authStore.isValid);
    // console.log(pb.authStore.token);
    // console.log(pb.authStore.model.id);
    return resultAuth;
  };

  const logoutUser = async () => pb.authStore.clear();

  //Productos

  // fetch a paginated records list
  const getProductos = async () =>
    await pb.collection("productos").getList(1, 50, {
      sort: "-created",
    });

  // getFile url {'thumb': '100x250'}
  const getFileUrl = async(record, filename, thumb) =>{
    const pb = await initPocketBase();
    const result= pb.getFileUrl(record, filename, { thumb: "100x250" });
    return result;
  }

  //getRecordID
  const getRecordID = async (collection, recordID) =>{
    const pb = await initPocketBase();
    const result=await pb.collection(collection).getOne(
      recordID
      // { expand: 'relField1,relField2.subRelField',}
      );
      return result;
  }


  //getFullList
  const getFullList = async (collection) => {
    const pb = await initPocketBase();
    const result = await pb
      .collection(collection)
      .getFullList(200 /* batch size */, {
        sort: "-created",
      });
    return result;
  };

  // createRecord
  const createRecord = async (collection, data) => {
    const pb = await initPocketBase();
    const result = await pb.collection(collection).create(data);
    return result;
  };

  // fetch a paginated records list
  const getPaginateList = async () => {
    await pb.collection("productos").getList(1, 50, {
      filter: 'created >= "2022-01-01 00:00:00" && someField1 != someField2',
    });
  };

  //  initPocketBase();

  return {
    createUser,
    loginUser,
    logoutUser,
    // isLogged,
    getProductos,
    getFileUrl,
    getRecordID,
    getFullList,
    createRecord,
  };
}

export default usePocketBase;
