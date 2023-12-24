import axios from 'axios';
import {IMessageData} from '../../components/MessageData';
import {LexResponseSchema} from '../api/submit';
import {parseXML} from '../../utils/helpers/parseXML';
/**
 * Key and values in the options fields are returned as singular arrays in XML format
 * Join this arrays so they can be read as a singular string
 * @param message
 * @returns
 */
export const postMessage = async (
  message: string
): Promise<undefined | IMessageData[]> => {
  if (!message) {
    return;
  }

  const response = await axios.post(
    '/api/submit',
    {message: message},
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const result: LexResponseSchema = response.data;

  const data: IMessageData[] = [];
  for (const message of result.messages) {
    data.push(processMessage(message));
  }

  return data;
};

const processMessage = message => {
  const xml = parseXML(message.content);
  const data = xml.root;

  if (data.options) {
    data.options = data.options.map(option => {
      return {key: option.key.join(), value: option.value.join()};
    });
  }

  return data as IMessageData;
};
