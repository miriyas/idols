import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { IsotopeOptions } from 'isotope-layout';
import cx from 'classnames';

import { IIdol, IIsotopes } from '@/types';
import Isotope from '@/libs/isotope-layout';
import { useResponsive } from '@/hooks/useResponsive';

import Idol from '@/components/Idol';
import styles from './IdolYear.module.scss';
import { YEARS } from '@/constants';

interface Props {
  idols: IIdol[];
  year: number;
  isotopes: MutableRefObject<IIsotopes>;
}

const IdolYear = (props: Props) => {
  const { idols, isotopes, year } = props;

  const { isMobile } = useResponsive();

  const yearDesc = YEARS.find((yearData) => yearData.year === year);

  const OPTIONS: IsotopeOptions = useMemo(
    () => ({
      itemSelector: `.grid-item-${year}`,
      layoutMode: 'packery',
      transitionDuration: 200,
      percentPosition: true,
      packery: {
        gutter: 28,
        columnWidth: isMobile ? 132 : 140,
      },
    }),
    [year, isMobile],
  );

  useEffect(() => {
    const elem = document.querySelector<HTMLElement>(`.grid-${year}`);
    if (!elem) return;

    isotopes.current[year] = new Isotope(elem, OPTIONS);
  }, [OPTIONS, isotopes, year]);

  const sort = useCallback(() => {
    setTimeout(() => {
      isotopes.current[year].arrange(OPTIONS);
    }, 300); // NOTE: covers transition duration
  }, [OPTIONS, isotopes, year]);

  return (
    <div id={`idol-year-${year}`} className={styles.idolYear}>
      <dt className={styles.title} title={`${year}년에 데뷔한 아이돌 수는 ${idols.length}개`}>
        {year}
      </dt>
      {yearDesc && <dd className={styles.desc}>{yearDesc.desc}</dd>}

      <ul className={cx(styles.idols, `grid-${year}`)}>
        {idols.map((idol) => {
          return <Idol key={`${idol.name}-${idol.debutYear}`} idol={idol} sort={sort} />;
        })}
      </ul>
    </div>
  );
};

export default IdolYear;
