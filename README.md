# @jnoodle/rc-picker 

Function enhanced and bug fixed [react-component/picker](https://github.com/react-component/picker)

[![NPM version][npm-image]][npm-url]
[![bundle size][bundlephobia-image]][bundlephobia-url]

[npm-image]: http://img.shields.io/npm/v/@geezee/rc-picker.svg?style=flat-square
[npm-url]: http://npmjs.org/package/@geezee/rc-picker
[bundlephobia-url]: https://bundlephobia.com/result?p=@geezee/rc-picker
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/@geezee/rc-picker


## Install

[![@geezee/rc-picker](https://nodei.co/npm/@geezee/rc-picker.png)](https://npmjs.org/package/@geezee/rc-picker)

## Usage

```js
import Picker from '@geezee/rc-picker';
import '@geezee/rc-picker/assets/index.css';
import { render } from 'react-dom';

render(<Picker />, mountNode);
```

### Picker

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| prefixCls | String | rc-picker | prefixCls of this component |
| className | String | '' | additional css class of root dom node |
| style | React.CSSProperties |  | additional style of root dom node |
| dropdownClassName | String | '' | additional className applied to dropdown |
| dropdownAlign | Object:alignConfig of [dom-align](https://github.com/yiminghe/dom-align) |  | value will be merged into placement's dropdownAlign config |
| popupStyle | React.CSSProperties |  | customize popup style |
| transitionName | String | '' | css class for animation |
| locale | Object | import from 'rc-picker/lib/locale/en_US' | rc-picker locale |
| inputReadOnly | Boolean | false | set input to read only |
| allowClear | Boolean | false | whether show clear button |
| autoFocus | Boolean | false | whether auto focus |
| showTime | Boolean \| Object | [showTime options](#showTime-options) | to provide an additional time selection |
| picker | time \| date \| week \| month \| year |  | control which kind of panel should be shown |
| format | String \| String[] | depends on whether you set timePicker and your locale | use to format/parse date(without time) value to/from input. When an array is provided, all values are used for parsing and first value for display |
| use12Hours | Boolean | false | 12 hours display mode |
| value | moment |  | current value like input's value |
| defaultValue | moment |  | defaultValue like input's defaultValue |
| open | Boolean | false | current open state of picker. controlled prop |
| suffixIcon | ReactNode |  | The custom suffix icon |
| clearIcon | ReactNode |  | The custom clear icon |
| prevIcon | ReactNode |  | The custom prev icon |
| nextIcon | ReactNode |  | The custom next icon |
| superPrevIcon | ReactNode |  | The custom super prev icon |
| superNextIcon | ReactNode |  | The custom super next icon |
| disabled | Boolean | false | whether the picker is disabled |
| placeholder | String |  | picker input's placeholder |
| getPopupContainer | function(trigger) |  | to set the container of the floating layer, while the default is to create a div element in body |
| onChange | Function(date: moment, dateString: string) |  | a callback function, can be executed when the selected time is changing |
| onOpenChange | Function(open:boolean) |  | called when open/close picker |
| onFocus | (evnet:React.FocusEventHandler<HTMLInputElement>) => void |  | called like input's on focus |
| onBlur | (evnet:React.FocusEventHandler<HTMLInputElement>) => void |  | called like input's on blur |
| direction | String: ltr or rtl |  | Layout direction of picker component, it supports RTL direction too. |

### PickerPanel

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| prefixCls | String | rc-picker | prefixCls of this component |
| className | String | '' | additional css class of root dom |
| style | React.CSSProperties |  | additional style of root dom node |
| locale | Object | import from 'rc-picker/lib/locale/en_US' | rc-picker locale |
| value | moment |  | current value like input's value |
| defaultValue | moment |  | defaultValue like input's defaultValue |
| defaultPickerValue | moment |  | Set default display picker view date |
| mode | time \| datetime \| date \| week \| month \| year \| decade |  | control which kind of panel |
| picker | time \| date \| week \| month \| year |  | control which kind of panel |
| tabIndex | Number | 0 | view [tabIndex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) |
| showTime | Boolean \| Object | [showTime options](#showTime-options) | to provide an additional time selection |
| showToday | Boolean | false | whether to show today button |
| disabledDate | Function(date:moment) => Boolean |  | whether to disable select of current date |
| dateRender | Function(currentDate:moment, today:moment) => React.Node |  | custom rendering function for date cells |
| monthCellRender | Function(currentDate:moment, locale:Locale) => React.Node |  | Custom month cell render method |
| renderExtraFooter | (mode) => React.Node |  | extra footer |
| onSelect | Function(date: moment) |  | a callback function, can be executed when the selected time |
| onPanelChange | Function(value: moment, mode) |  | callback when picker panel mode is changed |
| onMouseDown | (evnet:React.MouseEventHandler<HTMLInputElement>) => void |  | callback when executed onMouseDown evnent |
| direction | String: ltr or rtl |  | Layout direction of picker component, it supports RTL direction too. |

### RangePicker

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| prefixCls | String | rc-picker | prefixCls of this component |
| className | String | '' | additional css class of root dom |
| style | React.CSSProperties |  | additional style of root dom node |
| locale | Object | import from 'rc-picker/lib/locale/en_US' | rc-picker locale |
| value | moment |  | current value like input's value |
| defaultValue | moment |  | defaultValue like input's defaultValue |
| defaultPickerValue | moment |  | Set default display picker view date |
| separator | String | '~' | set separator between inputs |
| picker | time \| date \| week \| month \| year |  | control which kind of panel |
| placeholder | [String, String] |  | placeholder of date input |
| showTime | Boolean \| Object | [showTime options](#showTime-options) | to provide an additional time selection |
| showTime.defaultValue | [moment, moment] |  | to set default time of selected date |
| use12Hours | Boolean | false | 12 hours display mode |
| disabledTime | Function(date: moment, type:'start'\|'end'):Object |  |  | to specify the time that cannot be selected |
| ranges | { String \| [range: string]: moment[] } \| { [range: string]: () => moment[] } |  | preseted ranges for quick selection |
| format | String \| String[] | depends on whether you set timePicker and your locale | use to format/parse date(without time) value to/from input. When an array is provided, all values are used for parsing and first value for display |
| allowEmpty | [Boolean, Boolean] |  | allow range picker clearing text |
| selectable | [Boolean, Boolean] |  | whether to selected picker |
| disabled | Boolean | false | whether the range picker is disabled |
| onChange | Function(value:[moment], formatString: [string, string]) |  | a callback function, can be executed when the selected time is changing |
| onCalendarChange | Function(value:[moment], formatString: [string, string], info: { range:'start'\|'end' }) |  | a callback function, can be executed when the start time or the end time of the range is changing |
| direction | String: ltr or rtl |  | Layout direction of picker component, it supports RTL direction too. |
| order | Boolean | true | (TimeRangePicker only) `false` to disable auto order |

### showTime-options

| Property            | Type    | Default | Description                        |
| ------------------- | ------- | ------- | ---------------------------------- |
| format              | String  |         | moment format                      |
| showHour            | Boolean | true    | whether show hour                  |
| showMinute          | Boolean | true    | whether show minute                |
| showSecond          | Boolean | true    | whether show second                |
| use12Hours          | Boolean | false   | 12 hours display mode              |
| hourStep            | Number  | 1       | interval between hours in picker   |
| minuteStep          | Number  | 1       | interval between minutes in picker |
| secondStep          | Number  | 1       | interval between seconds in picker |
| hideDisabledOptions | Boolean | false   | whether hide disabled options      |
| defaultValue        | moment  | null    | default initial value              |

## Development

```
npm install
npm start
```

## License

@geezee/rc-picker is released under the MIT license.
