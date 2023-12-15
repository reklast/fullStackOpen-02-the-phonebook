import Button from "./Button";

const Number = ({ number, id, deletePerson }) => {
  return <li>{number.name} {number.number} <Button text='delete' type="submit" handleNewChange={() => deletePerson(id)} /></li>;
};

export default Number;
