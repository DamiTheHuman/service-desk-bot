export class Logger {
  /**
   *
   * @param message
   */
  public info = (message: string) => {
    console.log(message);
  };

  /**
   *
   * @param message
   */
  public warning = (message: string) => {
    console.warn(message);
  };

  /**
   *
   * @param message
   */
  public error = (message: string) => {
    console.error(message);
  };
}
