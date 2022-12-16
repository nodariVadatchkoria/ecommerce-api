import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { OrderEntity } from "./order.entity";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { OrderDto } from "./dtos/order.dto";
import { OrderCreateDto } from "./dtos/order-create.dto";

@ApiTags("order")
@Controller("order")
export class OrderController {
  constructor(private orderService: OrderService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  async order(@Request() req): Promise<OrderDto> {
    return this.orderService.order(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    type: OrderDto,
    isArray: true
  })
  @ApiBearerAuth()
  async getOrders(@Request() req): Promise<OrderDto[]> {
    return await this.orderService.getOrders(req.user);
  }
}
