import {useState} from 'react';
import {getTickets} from '../../utils/helpers/getTickets';
import Ticket from '../../components/Ticket';

export default function Page({data}) {
  const [tickets] = useState(data);
  const renderTickets = tickets.map(
    ({incidentLevel, detail, username, systemAffected}, key) => {
      return (
        <Ticket
          key={key}
          id={key}
          username={username.S}
          incidentLevel={incidentLevel.S}
          systemAffected={systemAffected.S}
          detail={detail.S}
        />
      );
    }
  );

  return (
    <div id="statistics">
      <div className="container">
        <h2>Statistics</h2>
        <div className="row">{renderTickets}</div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await getTickets();
  const data = res.Items;

  return {props: {data}};
}
