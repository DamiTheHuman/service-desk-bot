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
export const deliverMessageToBot = async (
  message: string
): Promise<undefined | IMessageData> => {
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

  const xml = parseXML(result.messages[0].content);
  const data = xml.root;

  if (data.options) {
    data.options = data.options.map(option => {
      return {key: option.key.join(), value: option.value.join()};
    });
  }

  return data as IMessageData;
};
