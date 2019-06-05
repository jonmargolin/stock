import { ID } from '@datorama/akita';

export interface Err {
	error: string;
}

export interface Table {
	id: ID;
	data: Row;
	metaData: MeteData;
}

/**
 * A factory function that creates Table
 */
export function createTable(params: Partial<Table>) {
	return {} as Table;
}

export interface MeteData {
	Information: string;
	Symbol: string;
	LastRefreshed: string;
	Interval: string;
	OutputSize: string;
	TimeZone: string;
}

export interface Row {
	[key: number]: number[];
}

export interface Data {
	data: Row[];
}
