export default function WinnerCard(props) {
  const { pointTotals, round, names } = props;

  function getWinners() {
    let winners = [0];
    for (let i = 1; i < 4; i++) {
      if (pointTotals[i] < pointTotals[winners[0]]) {
        winners = [i];
      } else if (pointTotals[i] === pointTotals[winners[0]]) {
        winners.push(i);
      }
    }
    let namedWinners = winners.map((i) => names[i]);
    return namedWinners;
  }

  return (
    <div className="winner-bar">
      <h1>
        {getWinners()} won! in {round} rounds
      </h1>
    </div>
  );
}
