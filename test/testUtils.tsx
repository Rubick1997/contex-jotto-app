import { ReactWrapper, ShallowWrapper } from "enzyme";
export const findByTestAttr = (
  wrapper: ShallowWrapper | ReactWrapper,
  val: string
) => wrapper.find(`[data-test='${val}']`);
