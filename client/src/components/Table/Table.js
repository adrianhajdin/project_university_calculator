
import React from 'react';

import { TableCell, Table, TableBody, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';

const table = ({ props: {
  evaluationMaturaElective1,
  evaluationMaturaElective2,
  evaluationMaturaElective3,
  percentagesTotal,
  totalGradePoints,
  pointsMaturaCroatian,
  pointsMaturaMathematics,
  pointsMaturaEnglish,
  pointsMaturaElective1,
  pointsMaturaElective2,
  pointsMaturaElective3,
  pointsExtraField1,
  pointsExtraField2,
  pointsExtraField3,
  evaluationExtraField1,
  evaluationExtraField2,
  evaluationExtraField3,
  evaluationMaturaElective1Name,
  evaluationMaturaElective2Name,
  evaluationMaturaElective3Name,
} }) => (
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
            <TableCell>Broj bodova od mature - {evaluationMaturaElective1Name}:</TableCell>
            <TableCell>{pointsMaturaElective1}</TableCell>
          </TableRow>
        ) : null}
      {evaluationMaturaElective2
        ? (
          <TableRow>
            <TableCell>Broj bodova od mature - {evaluationMaturaElective2Name}:</TableCell>
            <TableCell>{pointsMaturaElective2}</TableCell>
          </TableRow>
        ) : null}
      {evaluationMaturaElective3
        ? (
          <TableRow>
            <TableCell>Broj bodova od mature - {evaluationMaturaElective3Name}:</TableCell>
            <TableCell>{pointsMaturaElective3}</TableCell>
          </TableRow>
        ) : null}
      {evaluationExtraField1
        ? (
          <TableRow>
            <TableCell>Broj bodova od dodatnih provjera 1.</TableCell>
            <TableCell>{pointsExtraField1}</TableCell>
          </TableRow>
        ) : null}
      {evaluationExtraField2
        ? (
          <TableRow>
            <TableCell>Broj bodova od dodatnih provjera 2.</TableCell>
            <TableCell>{pointsExtraField2}</TableCell>
          </TableRow>
        ) : null}
      {evaluationExtraField3
        ? (
          <TableRow>
            <TableCell>Broj bodova od dodatnih provjera 3.</TableCell>
            <TableCell>{pointsExtraField3}</TableCell>
          </TableRow>
        ) : null}
    </TableBody>
  </Table>
);

table.propTypes = {
  props: PropTypes.shape({}).isRequired,
};

export default table;
