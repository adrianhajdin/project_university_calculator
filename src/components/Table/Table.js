
import React from 'react';
import { TableCell, Table, TableBody, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';

const table = ({ props: { evaluationMaturaElective1, evaluationMaturaElective2, evaluationMaturaElective3, percentagesTotal, totalGradePoints, pointsMaturaCroatian, pointsMaturaMathematics, pointsMaturaEnglish, pointsMaturaElective1, pointsMaturaElective2, pointsMaturaElective3 } }) => (
  <Table>
    <TableBody>
      <TableRow>
        <TableCell>Ukupan prosjek:</TableCell>
        <TableCell>{(percentagesTotal / 4).toFixed(2)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Broj bodova od ocjena:</TableCell>
        <TableCell>{totalGradePoints}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Broj bodova od mature iz Hrvatskog jezika:</TableCell>
        <TableCell>{pointsMaturaCroatian}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Broj bodova od mature iz Matematike:</TableCell>
        <TableCell>{pointsMaturaMathematics}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Broj bodova od mature iz Engleskog jezika:</TableCell>
        <TableCell>{pointsMaturaEnglish}</TableCell>
      </TableRow>
      {evaluationMaturaElective1
        ? (
          <TableRow>
            <TableCell>Broj bodova od mature iz 1. Izbornog predmeta:</TableCell>
            <TableCell>{pointsMaturaElective1}</TableCell>
          </TableRow>
        ) : null}
      {evaluationMaturaElective2
        ? (
          <TableRow>
            <TableCell>Broj bodova od mature iz 2. Izbornog predmeta:</TableCell>
            <TableCell>{pointsMaturaElective2}</TableCell>
          </TableRow>
        ) : null}
      {evaluationMaturaElective3
        ? (
          <TableRow>
            <TableCell>Broj bodova od mature iz 3. Izbornog predmeta:</TableCell>
            <TableCell>{pointsMaturaElective3}</TableCell>
          </TableRow>
        ) : null}
    </TableBody>
  </Table>
);

table.propTypes = {
  props: PropTypes.shape({}).isRequired,
};

export default table;
