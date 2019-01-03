export default function breeds(state = [], action: any) {
  switch (action.type) {
    case "CHANGE_BREEDS":
      return action.payload;
    default:
      return state;
  }
}
