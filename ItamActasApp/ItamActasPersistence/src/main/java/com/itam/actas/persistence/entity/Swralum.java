/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.itam.actas.persistence.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author JABS
 */
@Entity
@Table(name = "SWRALUM")
@NamedQueries({
    @NamedQuery(name = "Swralum.findAll", query = "SELECT s FROM Swralum s"),
    @NamedQuery(name = "Swralum.findBySwralumTermCode", query = "SELECT s FROM Swralum s WHERE s.swralumPK.swralumTermCode = :swralumTermCode"),
    @NamedQuery(name = "Swralum.findBySwralumCrn", query = "SELECT s FROM Swralum s WHERE s.swralumPK.swralumCrn = :swralumCrn"),
    @NamedQuery(name = "Swralum.findBySwralumAlumPidm", query = "SELECT s FROM Swralum s WHERE s.swralumPK.swralumAlumPidm = :swralumAlumPidm"),
    @NamedQuery(name = "Swralum.findBySwralumAlumId", query = "SELECT s FROM Swralum s WHERE s.swralumAlumId = :swralumAlumId"),
    @NamedQuery(name = "Swralum.findBySwralumAlumName", query = "SELECT s FROM Swralum s WHERE s.swralumAlumName = :swralumAlumName"),
    @NamedQuery(name = "Swralum.findBySwralumCalificacion", query = "SELECT s FROM Swralum s WHERE s.swralumCalificacion = :swralumCalificacion"),
    @NamedQuery(name = "Swralum.findBySwralumActivityDate", query = "SELECT s FROM Swralum s WHERE s.swralumActivityDate = :swralumActivityDate"),
    @NamedQuery(name = "Swralum.findBySwralumUser", query = "SELECT s FROM Swralum s WHERE s.swralumUser = :swralumUser")})
public class Swralum implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected SwralumPK swralumPK;
    @Basic(optional = false)
    @Column(name = "SWRALUM_ALUM_ID")
    private String swralumAlumId;
    @Basic(optional = false)
    @Column(name = "SWRALUM_ALUM_NAME")
    private String swralumAlumName;
    @Column(name = "SWRALUM_CALIFICACION")
    private String swralumCalificacion;
    @Column(name = "SWRALUM_ACTIVITY_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date swralumActivityDate;
    @Column(name = "SWRALUM_USER")
    private String swralumUser;
    @JoinColumns({
        @JoinColumn(name = "SWRALUM_TERM_CODE", referencedColumnName = "SWBGRUP_TERM_CODE", insertable = false, updatable = false),
        @JoinColumn(name = "SWRALUM_CRN", referencedColumnName = "SWBGRUP_CRN", insertable = false, updatable = false)})
    @ManyToOne(optional = false)
    private Swbgrup swbgrup;

    public Swralum() {
    }

    public Swralum(SwralumPK swralumPK) {
        this.swralumPK = swralumPK;
    }

    public Swralum(SwralumPK swralumPK, String swralumAlumId, String swralumAlumName) {
        this.swralumPK = swralumPK;
        this.swralumAlumId = swralumAlumId;
        this.swralumAlumName = swralumAlumName;
    }

    public Swralum(String swralumTermCode, String swralumCrn, int swralumAlumPidm) {
        this.swralumPK = new SwralumPK(swralumTermCode, swralumCrn, swralumAlumPidm);
    }

    public SwralumPK getSwralumPK() {
        return swralumPK;
    }

    public void setSwralumPK(SwralumPK swralumPK) {
        this.swralumPK = swralumPK;
    }

    public String getSwralumAlumId() {
        return swralumAlumId;
    }

    public void setSwralumAlumId(String swralumAlumId) {
        this.swralumAlumId = swralumAlumId;
    }

    public String getSwralumAlumName() {
        return swralumAlumName;
    }

    public void setSwralumAlumName(String swralumAlumName) {
        this.swralumAlumName = swralumAlumName;
    }

    public String getSwralumCalificacion() {
        return swralumCalificacion;
    }

    public void setSwralumCalificacion(String swralumCalificacion) {
        this.swralumCalificacion = swralumCalificacion;
    }

    public Date getSwralumActivityDate() {
        return swralumActivityDate;
    }

    public void setSwralumActivityDate(Date swralumActivityDate) {
        this.swralumActivityDate = swralumActivityDate;
    }

    public String getSwralumUser() {
        return swralumUser;
    }

    public void setSwralumUser(String swralumUser) {
        this.swralumUser = swralumUser;
    }

    public Swbgrup getSwbgrup() {
        return swbgrup;
    }

    public void setSwbgrup(Swbgrup swbgrup) {
        this.swbgrup = swbgrup;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (swralumPK != null ? swralumPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Swralum)) {
            return false;
        }
        Swralum other = (Swralum) object;
        if ((this.swralumPK == null && other.swralumPK != null) || (this.swralumPK != null && !this.swralumPK.equals(other.swralumPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.itam.actas.persistence.entity.Swralum[ swralumPK=" + swralumPK + " ]";
    }
    
}
