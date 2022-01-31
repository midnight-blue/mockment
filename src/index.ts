import moment, { isMoment, Moment } from 'moment';

type Time = Date | number | Moment;

let _nowGlobal = Date.now;
let _nowNext = Date.now;

beforeEach(() => {
	const s = jest.spyOn(moment, 'now');
	s.mockImplementation(() => _nowNext());
});

afterEach(() => {
	_nowNext = _nowGlobal;
});

export function setNowBeforeEach(now: Time) {
	_nowGlobal = () => getMillis(now);
	_nowNext = _nowGlobal;
}

export function setNowTo(now: Time) {
	_nowNext = () => getMillis(now);
}

export function startNowFrom(now: Time) {
	const currentTimeAtStart = moment(Date.now());
	_nowNext = () => {
		const timeElapsed = moment(Date.now()).diff(currentTimeAtStart);
		return moment(getMillis(now)).add(timeElapsed).valueOf();
	};
}

export function resetAll() {
	_nowNext = Date.now;
	_nowGlobal = Date.now;
}

function getMillis(time: Time): number {
	if (time instanceof Date) {
		return (time as Date).valueOf();
	} else if (isMoment(time)) {
		return (time as Moment).valueOf();
	} else {
		return time;
	}
}
