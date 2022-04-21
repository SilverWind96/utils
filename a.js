function convertToContextAction(iState) {
  const breakPoint = "asdfghjkl";
  const arr = iState.split("\n").map((e) => e.trim());
  const afterTrans = arr.reduce((prev, curr, currIdx) => {
    if (curr.startsWith("set")) {
      prev.push({
        type: curr.split(":")[0],
        [arr[currIdx - 1].split(":")[0]]:
          breakPoint +
          arr[currIdx - 1].split(":")[1].trim().replace(";", "") +
          breakPoint,
      });
    }
    return prev;
  }, []);
  const json = JSON.stringify(afterTrans);
  const nJson = json
    .slice(1, json.length - 1)
    .replaceAll("},{", "}|{")
    .replaceAll(`"${breakPoint}`, "")
    .replaceAll(`${breakPoint}"`, "");
  return nJson;
}
function convertToContextReducer(iState) {
  const arr = iState.split("\n").map((e) => e.trim());
  const afterTrans = arr.reduce((prev, curr, currIdx) => {
    if (curr.startsWith("set")) {
      prev.push(
        `case "${curr.split(":")[0]}": return {...state,${[
          arr[currIdx - 1].split(":")[0],
        ]}:action.${[arr[currIdx - 1].split(":")[0]]}}`
      );
    }
    return prev;
  }, []);
  const json = JSON.stringify(afterTrans);
  const nJson = json
    .slice(2, json.length - 2)
    .replaceAll('","', ";")
    .replaceAll("\\", "");
  return nJson;
}

function convertToContextProviderFn(iState) {
  const arr = iState.split("\n").map((e) => e.trim());
  const afterTrans = arr.reduce((prev, curr, currIdx) => {
    if (curr.startsWith("set")) {
      prev.push(
        `const ${curr.split(":")[0]} =(${arr[currIdx - 1].replace(
          ";",
          ""
        )})=>{dispatch({type:"${curr.split(":")[0]}",${
          arr[currIdx - 1].split(":")[0]
        }})}`
      );
    }
    return prev;
  }, []);
  const json = JSON.stringify(afterTrans);
  const nJson =
    json
      .slice(2, json.length - 2)
      .replaceAll(`","`, ";")
      .replaceAll("\\", "") + ";";
  return nJson;
}

function convertToContextProviderExport(iState) {
  const arr = iState.split("\n").map((e) => e.trim());
  const afterTrans = arr.reduce((prev, curr) => {
    if (curr.startsWith("set")) {
      prev.push(`${curr.split(":")[0]}`);
    }
    return prev;
  }, []);
  const json = JSON.stringify(afterTrans);
  const nJson = json.slice(2, json.length - 2).replaceAll(`"`, "");
  return nJson;
}

function convertToContext(iState) {
  console.log(convertToContextAction(iState));
  console.log(convertToContextReducer(iState));
  console.log(convertToContextProviderFn(iState));
  console.log(convertToContextProviderExport(iState));
}
