
import React from 'react';
import { TableCell, Table, TableBody, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';

const table = ({ props: { evaluationMaturaElective, percentagesTotal, totalGradePoints, pointsMaturaCroatian, pointsMaturaMathematics, pointsMaturaEnglish, pointsMaturaElective } }) => (
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
      {evaluationMaturaElective
        ? (
          <TableRow>
            <TableCell>Broj bodova od mature iz Izbornog predmeta:</TableCell>
            <TableCell>{pointsMaturaElective}</TableCell>
          </TableRow>
        ) : null}
    </TableBody>
  </Table>
);

table.propTypes = {
  props: PropTypes.shape({}).isRequired,
};

export default table;
