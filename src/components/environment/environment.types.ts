export interface Environment {
  id: string;
  label: string;
  icon: string;
  background: string;
  credit: { name: string; url: string };
  /**
   * @example `bg-black/10`
   */
  brightnessOffset?: string;
}

export interface EnvironmentSession {
  environment: string;
}
