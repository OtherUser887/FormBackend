import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ExtintorService } from './extintor.service';
import { CreateExtintorDto } from './dto/create-extintor.dto';
import { UpdateExtintorDto } from './dto/update-extintor.dto';

@Controller('extintor')
export class ExtintorController {
  constructor(private readonly extintorService: ExtintorService) {}

  @Post()
  async create(@Body() createExtintorDto: CreateExtintorDto) {
    return this.extintorService.create(createExtintorDto);
  }

  @Get()
  async findAll() {
    return this.extintorService.findAll();
  }

  // @Get(':area')
  // async findByArea(@Param('area') area: string) {
  //   return this.extintorService.findByArea(area);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExtintorDto: UpdateExtintorDto) {
    return this.extintorService.update(+id, updateExtintorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.extintorService.remove(+id);
  }
  
    @Get('area/:area') 
    async findByArea(@Param('area') area: string) {
      try {
        console.log("Buscando extintores para el área:", area);
        const extintores = await this.extintorService.findByArea(area);
        console.log("Extintores encontrados:", extintores);
        
        return {
          success: true,
          extintores: extintores,
          count: extintores.length
        };
      } catch (error) {
        console.error("Error en findByArea:", error);
        throw new HttpException(
          error.message || 'Error al buscar extintores',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
}
