package com.pyg.mapper;

import com.pyg.pojo.TbGoods;
import com.pyg.pojo.TbGoodsExample;
import com.pyg.pojo.TbGoodsKey;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TbGoodsMapper {
    int countByExample(TbGoodsExample example);

    int deleteByExample(TbGoodsExample example);

    int deleteByPrimaryKey(TbGoodsKey key);

    int insert(TbGoods record);

    int insertSelective(TbGoods record);

    List<TbGoods> selectByExample(TbGoodsExample example);

    TbGoods selectByPrimaryKey(TbGoodsKey key);

    int updateByExampleSelective(@Param("record") TbGoods record, @Param("example") TbGoodsExample example);

    int updateByExample(@Param("record") TbGoods record, @Param("example") TbGoodsExample example);

    int updateByPrimaryKeySelective(TbGoods record);

    int updateByPrimaryKey(TbGoods record);
}