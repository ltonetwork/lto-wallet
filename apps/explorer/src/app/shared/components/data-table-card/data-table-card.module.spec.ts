import { DataTableCardModule } from './data-table-card.module';

describe('DataTableCardModule', () => {
  let dataTableCardModule: DataTableCardModule;

  beforeEach(() => {
    dataTableCardModule = new DataTableCardModule();
  });

  it('should create an instance', () => {
    expect(dataTableCardModule).toBeTruthy();
  });
});
