import { useState } from 'react';
import { Cron } from 'react-js-cron';
import 'react-js-cron/dist/styles.css';

export function CronJob() {
    const [value, setValue] = useState('*/5 * * * *');

    return <Cron value={value} setValue={setValue} />
}
