// Import the echarts core module, which provides the necessary interfaces for using echarts.
// Import charts, all with Chart suffix
import { LineChart, BarChart, PieChart } from "echarts/charts"
// import components, all suffixed with Component
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from "echarts/components"
import * as echarts from "echarts/core"
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  CanvasRenderer, // SVGRenderer,
} from "echarts/renderers"

// Register the required components
echarts.use([
  LineChart,
  PieChart,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
])

export { echarts }
