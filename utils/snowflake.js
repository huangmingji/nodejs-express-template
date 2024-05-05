const bigInt = require('big-integer');

class SnowflakeId {
  constructor(workerId = 0, datacenterId = 0, sequence = 0) {
    // 雪花ID位分配
    this.workerIdBits = 5;
    this.datacenterIdBits = 5;
    this.sequenceBits = 12;

    // 最大值
    this.maxWorkerId = -1 ^ (-1 << this.workerIdBits); // 31
    this.maxDatacenterId = -1 ^ (-1 << this.datacenterIdBits); // 31

    // 左移位数
    this.workerIdShift = this.sequenceBits;
    this.datacenterIdShift = this.sequenceBits + this.workerIdBits;
    this.timestampLeftShift = this.sequenceBits + this.workerIdBits + this.datacenterIdBits;

    // 序列掩码
    this.sequenceMask = -1 ^ (-1 << this.sequenceBits);

    // 检查workerId和datacenterId是否超出范围
    if (workerId > this.maxWorkerId || workerId < 0) {
      throw new Error(`worker Id can't be greater than ${this.maxWorkerId} or less than 0`);
    }
    if (datacenterId > this.maxDatacenterId || datacenterId < 0) {
      throw new Error(`datacenter Id can't be greater than ${this.maxDatacenterId} or less than 0`);
    }

    // 初始化
    this.workerId = workerId;
    this.datacenterId = datacenterId;
    this.sequence = sequence;

    this.lastTimestamp = bigInt(0);

    // 起始时间戳（Twitter Snowflake算法起始时间：2020-11-04）
    this.epoch = bigInt("1262304000000"); // 2020-11-04T00:00:00Z in milliseconds
  }

  _tilNextMillis(lastTimestamp) {
    const timestamp = this._genTime();
    while (timestamp <= lastTimestamp) {
      timestamp = this._genTime();
    }
    return timestamp;
  }

  _genTime() {
    return bigInt(Date.now()).multiply(bigInt(1000)); // Convert to microseconds for higher resolution
  }

  nextId() {
    const timestamp = this._genTime();

    // 如果服务器时钟回拨或者重启，确保序列号重新开始
    if (timestamp.lt(this.lastTimestamp)) {
      throw new Error('Clock moved backwards. Refusing to generate id');
    }

    if (timestamp.eq(this.lastTimestamp)) {
      // 同一毫秒内生成序列号
      this.sequence = (this.sequence + 1) & this.sequenceMask;
      if (this.sequence === 0) {
        // 序列号溢出，则等待下一毫秒
        timestamp = this._tilNextMillis(this.lastTimestamp);
      }
    } else {
      // 不同毫秒内序列号重置
      this.sequence = 0;
    }

    // 更新最后时间戳
    this.lastTimestamp = timestamp;

    // 拼接并返回ID
    return timestamp.shiftLeft(this.timestampLeftShift)
      .or(bigInt(this.datacenterId).shiftLeft(this.datacenterIdShift))
      .or(bigInt(this.workerId).shiftLeft(this.workerIdShift))
      .or(this.sequence);
  }
}

module.exports = SnowflakeId;

// 使用示例
// const snowflake = new SnowflakeId(1, 2);
// console.log(snowflake.nextId().toString());