/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.cmc.nlms.dao;

import java.util.List;
import org.cmc.nlms.model.Setting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author MyPC
 */
@Repository
public interface SettingRepository extends JpaRepository<Setting,Integer>{
     @Query("SELECT s FROM Setting s WHERE s.groupType =:groupType ")
     List<Setting> findSettingBygroupType(@Param("groupType") String groupType);
     @Query("SELECT DISTINCT s.groupType FROM Setting s")
     List<String> getGroupType();
}
