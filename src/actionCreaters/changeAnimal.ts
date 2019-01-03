export default function changeAnimal(animal: string) {
  return { type: "CHANGE_ANIMAL", payload: animal };
}
