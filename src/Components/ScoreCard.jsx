export default function ScoreCard(props) {
  const names = Object.values(props.names);
  //   console.log(Object.values(props.names));
  //   const names = ;
  const header = names.map((name) => <h1 key={name}>{name}</h1>);

  console.log(names);

  return <div className="score-card">{header}</div>;
}
