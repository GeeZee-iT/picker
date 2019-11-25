import * as React from 'react';
import classNames from 'classnames';
import Picker, { PickerProps } from './Picker';
import { NullableDateType, DisabledTimes, DisabledTime } from './interface';
import { toArray } from './utils/miscUtil';
import RangeContext from './RangeContext';

type RangeValue<DateType> = [DateType | null, DateType | null] | null;

function canTriggerChange<DateType>(
  dates: [DateType | null, DateType | null],
  allowEmpty?: [boolean, boolean],
) {
  const passStart = dates[0] || (allowEmpty && allowEmpty[0]);
  const passEnd = dates[1] || (allowEmpty && allowEmpty[1]);
  return passStart && passEnd;
}

export interface RangePickerProps<DateType>
  extends Omit<
    PickerProps<DateType>,
    | 'value'
    | 'defaultValue'
    | 'defaultPickerValue'
    | 'onChange'
    | 'placeholder'
    | 'disabledTime'
    | 'showToday'
  > {
  value?: RangeValue<DateType>;
  defaultValue?: RangeValue<DateType>;
  defaultPickerValue?: [DateType, DateType];
  placeholder?: [string, string];
  disabledTime?: (
    date: DateType | null,
    type: 'start' | 'end',
  ) => DisabledTimes;
  ranges?: Record<
    string,
    | Exclude<RangeValue<DateType>, null>
    | (() => Exclude<RangeValue<DateType>, null>)
  >;
  separator?: string;
  allowEmpty?: [boolean, boolean];
  onChange?: (
    value: RangeValue<DateType>,
    formatString: [string, string],
  ) => void;
  onCalendarChange?: (
    value: RangeValue<DateType>,
    formatString: [string, string],
  ) => void;
}

function RangePicker<DateType>(props: RangePickerProps<DateType>) {
  const {
    prefixCls = 'rc-picker',
    className,
    style,
    value,
    defaultValue,
    defaultPickerValue,
    separator = '~',
    locale,
    generateConfig,
    placeholder,
    showTime,
    disabledTime,
    ranges,
    format = showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD',
    allowEmpty,
    onChange,
    onCalendarChange,
  } = props;

  const formatList = toArray(format);

  const [innerValue, setInnerValue] = React.useState<RangeValue<DateType>>(
    () => {
      if (value !== undefined) {
        return value;
      }
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      return null;
    },
  );

  const mergedValue = value !== undefined ? value : innerValue;

  const value1 = mergedValue ? mergedValue[0] : null;
  const value2 = mergedValue ? mergedValue[1] : null;

  const formatDate = (date: NullableDateType<DateType>) =>
    (date
      ? generateConfig.locale.format(locale.locale, date, formatList[0])
      : '');

  const onInternalChange = (values: NullableDateType<DateType>[]) => {
    let startDate: DateType | null = values[0] || null;
    let endDate: DateType | null = values[1] || null;

    if (startDate && endDate && generateConfig.isAfter(startDate, endDate)) {
      startDate = values[1] || null;
      endDate = values[0] || null;
    }

    setInnerValue([startDate, endDate]);

    const startStr = formatDate(startDate);
    const endStr = formatDate(endDate);

    if (onChange && canTriggerChange([startDate, endDate], allowEmpty)) {
      onChange([startDate, endDate], [startStr, endStr]);
    }

    if (onCalendarChange) {
      onCalendarChange([startDate, endDate], [startStr, endStr]);
    }
  };

  // ============================= Render =============================
  const pickerProps = {
    ...props,
    defaultValue: undefined,
    defaultPickerValue: undefined,
    className: undefined,
    style: undefined,
    placeholder: undefined,
    disabledTime: undefined,
  };

  // Time
  let disabledStartTime: DisabledTime<DateType> | undefined;
  let disabledEndTime: DisabledTime<DateType> | undefined;

  if (disabledTime) {
    disabledStartTime = (date: DateType | null) => disabledTime(date, 'start');
    disabledEndTime = (date: DateType | null) => disabledTime(date, 'end');
  }

  // Ranges
  let extraFooterSelections:
    | {
        label: string;
        onClick: React.MouseEventHandler<HTMLElement>;
      }[]
    | undefined;
  if (ranges) {
    extraFooterSelections = Object.keys(ranges).map(label => ({
      label,
      onClick: () => {
        const rangedValue = ranges[label];
        onInternalChange(
          typeof rangedValue === 'function' ? rangedValue() : rangedValue,
        );
      },
    }));
  }

  return (
    <div className={classNames(`${prefixCls}-range`, className)} style={style}>
      <RangeContext.Provider value={{ extraFooterSelections }}>
        <Picker<DateType>
          {...pickerProps}
          prefixCls={prefixCls}
          value={value1}
          placeholder={placeholder && placeholder[0]}
          defaultPickerValue={defaultPickerValue && defaultPickerValue[0]}
          disabledTime={disabledStartTime}
          onChange={date => {
            onInternalChange([date, value2]);
          }}
        />
      </RangeContext.Provider>
      {separator}
      <RangeContext.Provider value={{ extraFooterSelections }}>
        <Picker<DateType>
          {...pickerProps}
          prefixCls={prefixCls}
          value={value2}
          placeholder={placeholder && placeholder[1]}
          defaultPickerValue={defaultPickerValue && defaultPickerValue[1]}
          disabledTime={disabledEndTime}
          onChange={date => {
            onInternalChange([value1, date]);
          }}
        />
      </RangeContext.Provider>
    </div>
  );
}

export default RangePicker;
