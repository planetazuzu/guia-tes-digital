import { InfusionTable } from '@/data/calculators';

interface InfusionTableViewProps {
  table: InfusionTable;
}

const InfusionTableView = ({ table }: InfusionTableViewProps) => {
  return (
    <div className="card-procedure">
      <h3 className="font-bold text-foreground text-lg mb-2">{table.name}</h3>
      <p className="text-sm text-muted-foreground mb-4">{table.preparation}</p>

      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 font-semibold text-muted-foreground">
                Peso (kg)
              </th>
              {table.columns.map((col) => (
                <th
                  key={col}
                  className="text-center py-3 px-2 font-semibold text-muted-foreground"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.weight} className="border-b border-border/50">
                <td className="py-3 px-2 font-bold text-foreground">
                  {row.weight}
                </td>
                {table.columns.map((col) => (
                  <td key={col} className="text-center py-3 px-2 text-foreground">
                    {row.doses[col]} {table.unit}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-2xs text-muted-foreground mt-4 text-center">
        Rango de dosis: {table.doseRange}
      </p>
    </div>
  );
};

export default InfusionTableView;
