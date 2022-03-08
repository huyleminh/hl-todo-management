export interface IBaseModelInstance {
	insert(): void | number | string;
	delete(): void | number;
	update(): void | number | string;
}
