import React from 'react';
import StarRating from '../StarRating';

export interface ITicketProps {
  id: number;
  username: string;
  incidentLevel: string;
  systemAffected: string;
  detail: string;
}

const Ticket: React.FC<ITicketProps> = ({
  id,
  username,
  incidentLevel,
  systemAffected,
  detail,
}) => {
  return (
    <div className="col-md-4 ticket">
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th scope="row">Key</th>
            <td>{id}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Reported By</th>
            <td>{username}</td>
          </tr>
          <tr>
            <th scope="row">IncidentLevel</th>
            <td>
              <StarRating rating={parseInt(incidentLevel)} />
            </td>
          </tr>
          <tr>
            <th scope="row">System Affected </th>
            <td> {systemAffected}</td>
          </tr>
          <tr>
            <th scope="row">Detail </th>
            <td> {detail}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Ticket;
