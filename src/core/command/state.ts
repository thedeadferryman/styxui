import { get, relativeTo, set } from 'utils/object.ts';
import { isNotNil, uniqueId } from 'utils';

type PathObserver = (path: string, oldValue: any, newValue: any) => unknown;

class StateContainer {
	private observers: Map<number, PathObserver>;
	private observerBindings: Map<string, number[]>;

	constructor(
		private state: any,
		private onStateChange: (newState: any) => unknown,
	) {
		this.observers = new Map();
		this.observerBindings = new Map();
	}

	observePath = (path: string, observer: PathObserver) => {
		const observerId = uniqueId();
		const oldObservers = this.observerBindings.get(path) ?? [];
		this.observers.set(observerId, observer);
		this.observerBindings.set(path, oldObservers.concat(observerId));
		return observerId;
	};

	dropObserver = (id: number) => this.observers.delete(id);

	set = (path: string, value: any) => {
		console.log('set on exxx', this.state);
		for (const target of this.observerBindings.keys()) {
			if (path.startsWith(target)) {
				this.invokePathObserver(
					path,
					...this.stateChangeAtPath(target, path, value),
				);
			}
		}
		this.state = set(this.state, path, value);
		this.onStateChange(this.state);
	};

	get = (path: string) => get(this.state, path);

	getState = () => this.state;

	private stateChangeAtPath = (target: string, path: string, value: any) => {
		const oldState = this.get(target);
		const newState = set(oldState, relativeTo(path, target), value);

		return [oldState, newState] as const;
	};

	private invokePathObserver: PathObserver = (path, oldValue, newValue) => {
		const observerIds = this.observerBindings.get(path) ?? [];
		const validObserverIds = [];

		for (const observerId of observerIds) {
			const observer = this.observers.get(observerId);
			if (isNotNil(observer)) {
				observer(path, oldValue, newValue);
				validObserverIds.push(observerId);
			}
		}

		this.observerBindings.set(path, validObserverIds);
	};
}

export default StateContainer;