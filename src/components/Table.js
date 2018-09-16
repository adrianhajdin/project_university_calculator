
import React from 'react';
import { TableCell, Table, TableBody, TableRow } from '@material-ui/core';

const table = ({ props: { evaluationOpt, prosjekSvihRazreda, bodoviOdOcjena, bodoviZaHj, bodoviZaMat, bodoviZaEj, bodoviZaIzb } }) => (
  <Table>
    <TableBody>
      <TableRow>
        <TableCell>Ukupan prosjek: </TableCell>
        <TableCell>{(prosjekSvihRazreda / 4).toFixed(2)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Broj bodova od ocjena: </TableCell>
        <TableCell>{bodoviOdOcjena}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Broj bodova od mature iz Hrvatskog jezika: </TableCell>
        <TableCell>{bodoviZaHj}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Broj bodova od Matematike </TableCell>
        <TableCell>{bodoviZaMat}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Broj bodova od mature iz Engleskog jezika: </TableCell>
        <TableCell>{bodoviZaEj}</TableCell>
      </TableRow>
      {evaluationOpt
        ? (
          <TableRow>
            <TableCell>Broj bodova od mature iz Izbornog predmeta: </TableCell>
            <TableCell>{bodoviZaIzb}</TableCell>
          </TableRow>
        ) : null}
    </TableBody>
  </Table>
);

export default table;
