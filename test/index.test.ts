import moment from 'moment';
import { resetAll, setNowBeforeEach, setNowTo, startNowFrom } from '../src';

describe('setNowBeforeEach', () => {
	setNowBeforeEach(23);
	it('first run', () => {
		const x = moment();
		expect(x.valueOf()).toEqual(23);
	});
	it('second run', () => {
		const x = moment();
		expect(x.valueOf()).toEqual(23);
	});
});

describe('setNowTo', () => {
	it('first run', () => {
		setNowTo(42);
		const x = moment();
		expect(x.valueOf()).toEqual(42);
	});
	it('second run', () => {
		const x = moment();
		expect(x.valueOf()).not.toEqual(42);
	});
});

describe('setNowTo', () => {
	it('Should reset now within the same test', () => {
		setNowTo(42);
		const x = moment();
		expect(x.valueOf()).toEqual(42);

		setNowTo(23);
		const y = moment();
		expect(y.valueOf()).toEqual(23);
	});
});

describe('startNowFrom', () => {
	it('should start the now time from point in time', async () => {
		startNowFrom(123);
		const x = moment();
		await new Promise((resolve) => setTimeout(resolve, 200));
		const y = moment();
		expect(y.valueOf()).toBeGreaterThan(323);
		expect(y.valueOf() - x.valueOf()).toBeGreaterThan(200);
		// This assertion is only a guess as there is no guarantee how long setTimeout takes
		expect(y.valueOf()).toBeLessThan(5000);
	});
});

describe('test reset', () => {
	it('should reset to Date.now', () => {
		setNowTo(0);
		const systemNow = Date.now();
		resetAll();
		const momentNow = moment();
		expect(momentNow.valueOf()).toBeGreaterThanOrEqual(systemNow.valueOf());
	});
});

describe('test input formats', () => {
	it('should work with milliseconds', () => {
		setNowTo(42);
		const now = moment();
		expect(now.milliseconds()).toEqual(42);
	});
	it('should work with moment input', () => {
		const momentObject = moment(42);
		setNowTo(momentObject);
		const now = moment();
		expect(now.valueOf()).toEqual(momentObject.valueOf());
	});

	it('should work with date input', () => {
		const dateObject = new Date();
		setNowTo(dateObject);
		const now = moment();
		expect(now.valueOf()).toEqual(dateObject.valueOf());
	});
});
