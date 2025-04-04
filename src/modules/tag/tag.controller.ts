import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { OrdenTrabajo } from './schema/tag.schema';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() createDto: CreateTagDto): Promise<OrdenTrabajo> {
    return this.tagService.create(createDto);
  }

  // En tu TagController
  @Get('por-area')
  async findTagByArea(@Query('area') area: string) {
    const orden = await this.tagService.findByArea(area);
    if (!orden) {
      throw new NotFoundException('Área no encontrada');
    }
    return { tag: orden.tag };
  }



  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }
}
