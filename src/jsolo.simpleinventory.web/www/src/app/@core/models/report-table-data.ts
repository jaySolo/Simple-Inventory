export interface ReportTableData {
  caption: string;
  columns: ReportTableColumn[];
  rows: ReportTableRow[];
}

export interface ReportTableColumn {
  referenceName: string;
  displayName: string;
}

export interface ReportTableRow {
  cells: ReportTableCell[];
}

export interface ReportTableCell {
  rowReferenceName: string;
  value: any;
}
