export default function breed(state = "", action: any) {
  switch (action.type) {
    case "CHANGE_ANIMAL":
      return "";
    case "CHANGE_BREED":
      return action.payload;
    default:
      return state;
  }
}
