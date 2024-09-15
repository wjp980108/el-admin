import { calc } from 'a-calc';

export function moneyThousand(money: number | string) {
  if (typeof money === 'string')
    money = Number(money);

  if (Number.isNaN(money))
    return 0;

  if (money !== 0) {
    money = calc(`${money} | ,=2`);
  }
  return money;
}
