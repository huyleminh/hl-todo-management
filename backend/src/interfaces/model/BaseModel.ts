export interface IBaseModelInstance {
	insert(): Promise<void | number>;
	delete(): Promise<void | number>;
	update(): Promise<void | number>;
}
