export default function changeBreed(breed: string) {
  return { type: "CHANGE_BREED", payload: breed };
}
