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
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
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
@Table(name = "SWBFIRM")
@NamedQueries({
    @NamedQuery(name = "Swbfirm.findAll", query = "SELECT s FROM Swbfirm s"),
    @NamedQuery(name = "Swbfirm.findBySwbfirmPidm", query = "SELECT s FROM Swbfirm s WHERE s.swbfirmPidm = :swbfirmPidm"),
    @NamedQuery(name = "Swbfirm.findBySwbfirmUsuario", query = "SELECT s FROM Swbfirm s WHERE s.swbfirmUsuario = :swbfirmUsuario"),
    @NamedQuery(name = "Swbfirm.findBySwbfirmFecha", query = "SELECT s FROM Swbfirm s WHERE s.swbfirmFecha = :swbfirmFecha")})
public class Swbfirm implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "SWBFIRM_PIDM")
    private Integer swbfirmPidm;
    @Column(name = "SWBFIRM_USUARIO")
    private String swbfirmUsuario;
    @Column(name = "SWBFIRM_FECHA")
    @Temporal(TemporalType.TIMESTAMP)
    private Date swbfirmFecha;
    @Lob
    @Column(name = "SWBFIRM_FIRMA")
    private byte[] swbfirmFirma;

    public Swbfirm() {
    }

    public Swbfirm(Integer swbfirmPidm) {
        this.swbfirmPidm = swbfirmPidm;
    }

    public Integer getSwbfirmPidm() {
        return swbfirmPidm;
    }

    public void setSwbfirmPidm(Integer swbfirmPidm) {
        this.swbfirmPidm = swbfirmPidm;
    }

    public String getSwbfirmUsuario() {
        return swbfirmUsuario;
    }

    public void setSwbfirmUsuario(String swbfirmUsuario) {
        this.swbfirmUsuario = swbfirmUsuario;
    }

    public Date getSwbfirmFecha() {
        return swbfirmFecha;
    }

    public void setSwbfirmFecha(Date swbfirmFecha) {
        this.swbfirmFecha = swbfirmFecha;
    }

    public byte[] getSwbfirmFirma() {
        return swbfirmFirma;
    }

    public void setSwbfirmFirma(byte[] swbfirmFirma) {
        this.swbfirmFirma = swbfirmFirma;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (swbfirmPidm != null ? swbfirmPidm.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Swbfirm)) {
            return false;
        }
        Swbfirm other = (Swbfirm) object;
        if ((this.swbfirmPidm == null && other.swbfirmPidm != null) || (this.swbfirmPidm != null && !this.swbfirmPidm.equals(other.swbfirmPidm))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.itam.actas.persistence.entity.Swbfirm[ swbfirmPidm=" + swbfirmPidm + " ]";
    }
    
}
