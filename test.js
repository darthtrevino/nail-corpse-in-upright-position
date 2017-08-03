const nailCorpseInUprightPosition = require('./index');
const opts = {liveDangerously: true};
describe("Nailing the Corspe in the Upright Position", () => {
  it("catches errors thrown from the target", () => {
    const target = {
      derp: () => { throw new Error('derp thrown'); },
      x: 2,
      herp: () => 1,
    };
    const decorated = nailCorpseInUprightPosition(opts)(target);
    expect(() => decorated.derp()).not.toThrow();
    expect(decorated.herp()).toBe(1);
    expect(decorated.x).toEqual(2);
  });

  it("can decorate classes", () => {
    class Target {
      constructor() {
        this.x = 2;
      }

      get xValue() {
        return this.x;
      }

      throws() {
        throw new Error("it threw");
      }

      noThrow() {
        return 42;
      }
    }

    const decorated = nailCorpseInUprightPosition(opts)(new Target());
    expect(() => decorated.throws()).not.toThrow();
    expect(decorated.noThrow()).toBe(42);
    expect(decorated.xValue).toBe(2);
  });

  it("will respect property semantics", () => {
    class Target {
      constructor() {
        this.x = 1;
      }

      set xValue(val) {
        this.x = val;
      }

      get xValue() {
        return this.x;
      }
    }
    const tgt = new Target();
    const decorated = nailCorpseInUprightPosition(opts)(tgt);
    decorated.xValue = 3;
    expect(decorated.xValue).toBe(3);
  });

  it("will respect the 'this' context of bound functions", () => {
    const other = {x: 2};
    const target = {};
    target.derp = function() {return this.x}.bind(other);
    expect(target.derp()).toBe(2);

    const decorated = nailCorpseInUprightPosition(opts)(target);
    expect(decorated.derp()).toBe(2);
  });

  it("will catch exceptions thrown on properties", () => {
    class Target {
      set xValue(val) {
        throw new Error("i derped");
      }

      get xValue() {
        throw new Error("i derped");
      }
    }

    const decorated = nailCorpseInUprightPosition(opts)(new Target());
    expect(() => decorated.xValue = 2).not.toThrow();
    expect(() => decorated.xValue).not.toThrow();
  });
});