import { forwardRef, memo } from "react";
import SimpleBar, { type Props as SimplebarProps } from "simplebar-react";

/**
 * https://www.npmjs.com/package/simplebar-react?activeTab=readme
 */

// Extend the SimplebarProps to include the clickOnTrack property
interface ExtendedSimplebarProps extends SimplebarProps {
  clickOnTrack?: boolean;
}

const Scrollbar = forwardRef<HTMLElement, ExtendedSimplebarProps>(
  ({ children, ...other }, ref) => {
    return (
      <SimpleBar
        // className="h-full"
        style={{ height: "100%" }}
        scrollableNodeProps={{ ref }}
        clickOnTrack={false}
        {...other}
      >
        {children}
      </SimpleBar>
    );
  }
);

export default memo(Scrollbar);
