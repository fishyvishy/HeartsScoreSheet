export default function PlayerCard(props) {
  const { points, sum } = props;

  // awkward, but resolves key warning
  let range = [];
  for (var i = 0; i < points.length; i++) {
    range.push(i);
  }
  const tally = range.map((i) => <p key={i}>{points[i]}</p>);

  return (
    <div className="player-card">
      <h1>{props.name}</h1>
      {tally}
      <h2 className="total" style={{ color: `hsl(185, 50%, ${100 - sum}%)` }}>
        {sum}
      </h2>
    </div>
  );
}
